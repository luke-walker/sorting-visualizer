package main

import (
    "flag"
    "fmt"

    "github.com/gin-gonic/gin"
)

var algorithms = []string{
    "Bubble Sort",
}

func setupRouter() *gin.Engine {
    r := gin.Default()

    r.GET("/list", func(c *gin.Context) {
        c.JSON(200, algorithms)
    })

    return r 
}

func main() {
    portFlag := flag.Int("port", 5680, "specify server port")
    flag.Parse()

    fmt.Println("Starting server...")
    r := setupRouter()
    r.Run(fmt.Sprintf("127.0.0.1:%d", *portFlag))
    fmt.Printf("Running server on port %d\n", *portFlag)
}
