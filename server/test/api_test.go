package test

import (
    "fmt"
    "net/http"
    "testing"
)

const URL = "http://127.0.0.1:5680"

func TestSortAPI(t *testing.T) {
    runTest := func(name string, n int) {
        res, err := http.Get(fmt.Sprintf("%s/sort/%s/%d", URL, name, n))
        if err != nil {
            t.Log("could not connect to the server. is it running?")
            t.Fatal("error:", err)
        }
        if res.StatusCode != 200 {
            t.Fatal("response status code != 200")
        }
    }

    runTest("Bubble Sort", 50)
    runTest("Insertion Sort", 50)
}

func TestListAPI(t *testing.T) {
    res, err := http.Get(URL+"/list")
    if err != nil {
        t.Log("could not connect to the server. is it running?")
        t.Fatal("error:", err)
    }
    if res.StatusCode != 200 {
        t.Fatal("response status code != 200")
    }

    /* USE TO TEST JSON DATA

    defer res.Body.Close()

    body, err := io.ReadAll(res.Body)
    if err != nil {
        t.Fatal("error:", err)
    }

    var data []string
    err = json.Unmarshal(body, &data)
    if err != nil {
        t.Fatal("error:", err)
    }
    */
}
