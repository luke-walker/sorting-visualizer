package test

import (
    "net/http"
    "testing"
)

const URL = "http://127.0.0.1:5680"

func TestListAPI(t *testing.T) {
    res, err := http.Get(URL+"/list")
    if err != nil {
        t.Log("could not connect to the server. is it running?")
        t.Fatal("error:", err)
    }
    if res.StatusCode != 200 {
        t.Fatal("Response status code != 200")
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
