package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type Word struct {
    ID           int    `json:"id"`
    Theme        string `json:"theme"`
    English      string `json:"english,omitempty"`
    Korean       string `json:"korean"`
    Romanisation string `json:"romanisation"`
    Description  string `json:"description,omitempty"`
}

func main() {
    // Load environment variables from .env file
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    // Get database credentials from environment variables
    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    dbHost := os.Getenv("DB_HOST")
    dbPort := os.Getenv("DB_PORT")
    dbName := os.Getenv("DB_NAME")

    // Create the Data Source Name (DSN) for connecting to MySQL
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPassword, dbHost, dbPort, dbName)

    // Connect to MySQL database
    db, err := sql.Open("mysql", dsn)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Define the API endpoint
    http.HandleFunc("/api/words", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case http.MethodGet:
            // Query the database
            rows, err := db.Query("SELECT id, theme, english, korean, romanisation, description FROM korean_questions")
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }
            defer rows.Close()

            // Create a slice to hold the results
            var words []Word

            // Iterate over the rows and scan the data into the slice
            for rows.Next() {
                var word Word
                if err := rows.Scan(&word.ID, &word.Theme, &word.English, &word.Korean, &word.Romanisation, &word.Description); err != nil {
                    http.Error(w, err.Error(), http.StatusInternalServerError)
                    return
                }
                words = append(words, word)
            }

            // Check for errors from iterating over rows
            if err := rows.Err(); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }

            // Set the response header to JSON
            w.Header().Set("Content-Type", "application/json")

            // Encode the results as JSON and write to the response
            if err := json.NewEncoder(w).Encode(words); err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
            }

        case http.MethodPost:
            // Handle POST request to add new data
            var word Word
            if err := json.NewDecoder(r.Body).Decode(&word); err != nil {
                http.Error(w, err.Error(), http.StatusBadRequest)
                return
            }

            // Insert the new data into the database
            _, err := db.Exec("INSERT INTO korean_questions (theme, english, korean, romanisation, description) VALUES (?, ?, ?, ?, ?)",
                word.Theme, word.English, word.Korean, word.Romanisation, word.Description)
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }

            // Respond with a success message
            w.WriteHeader(http.StatusCreated)
            w.Write([]byte("Data added successfully"))

        case http.MethodPut:
            // Handle PUT request to update existing data
            var word Word
            if err := json.NewDecoder(r.Body).Decode(&word); err != nil {
                http.Error(w, err.Error(), http.StatusBadRequest)
                return
            }

            // Update the existing data in the database
            _, err := db.Exec("UPDATE korean_questions theme = ?, english = ?, korean = ?, romanisation = ?, description = ? WHERE id = ?",
                word.Theme, word.English, word.Korean, word.Romanisation, word.Description, word.ID)
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }

            // Respond with a success message
            w.Write([]byte("Data updated successfully"))

        case http.MethodDelete:
            // Handle DELETE request to delete existing data
            idStr := r.URL.Query().Get("id")
            if idStr == "" {
                http.Error(w, "Missing id parameter", http.StatusBadRequest)
                return
            }

            id, err := strconv.Atoi(idStr) // Convert id parameter to integer
            if err != nil {
                http.Error(w, "Invalid id parameter", http.StatusBadRequest)
                return
            }

            // Delete the data from the database
            _, err = db.Exec("DELETE FROM korean_questions WHERE id = ?", id)
            if err != nil {
                http.Error(w, err.Error(), http.StatusInternalServerError)
                return
            }

            // Respond with a success message
            w.Write([]byte("Data deleted successfully"))

        default:
            http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        }
    })

    // Start the server
    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}