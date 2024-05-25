package main

import (
    "flag"
    "fmt"
    "strconv"

    "github.com/gin-gonic/gin"

    "server/algs"
    "server/util"
)

const N_MIN = 10
const N_MAX = 1024

var algorithms = map[string](func([]int) [][]int){
    "Bubble Sort": algs.BubbleSort,
}

func setupRouter() *gin.Engine {
    r := gin.Default()

    r.GET("/sort/:alg/:n", func(c *gin.Context) {
        alg := c.Params.ByName("alg")
        n, err := strconv.Atoi(c.Params.ByName("n"))
        if err != nil {
            fmt.Println("error:", err)
            c.Status(500)
            return
        }
        // keep n within defined bounds
        n = min(max(n, N_MIN), N_MAX)

        randNums := util.RandNums(n)
        steps := algorithms[alg](randNums)
        c.JSON(200, steps)
    })

    r.GET("/list", func(c *gin.Context) {
        var keys []string
        for key := range algorithms {
            keys = append(keys, key)
        }
        c.JSON(200, keys)
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
