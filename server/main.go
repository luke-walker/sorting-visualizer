package main

import (
    "flag"
    "fmt"
    "sort"
    "strconv"

    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"

    "server/algs"
    "server/util"
)

const N_MIN = 10
const N_MAX = 512

var algorithms = map[string](func([]uint16) [][]uint16){
    "Bubble Sort": algs.BubbleSort,
    "Insertion Sort": algs.InsertionSort,
    "Quick Sort": algs.QuickSort,
}

func setupRouter() *gin.Engine {
    r := gin.Default()

    corsConfig := cors.DefaultConfig()
    corsConfig.AllowOrigins = []string{"http://127.0.0.1:3000","http://127.0.0.1:5173"}
    r.Use(cors.New(corsConfig))

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

        randNums := util.RandNums(uint16(n))
        steps := algorithms[alg](randNums)
        c.JSON(200, steps)
    })

    r.GET("/list", func(c *gin.Context) {
        var keys []string
        for key := range algorithms {
            keys = append(keys, key)
        }
        sort.Strings(keys)

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
