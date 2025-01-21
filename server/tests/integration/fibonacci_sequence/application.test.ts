describe("Fibonacci sequence integration tests",  function() {
    const API_URL = "http://localhost:4000/api/v1"
    test("Test create value", async function() {
        const data = {
            number: 5
        }
        const response = await fetch(API_URL + "/values", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(200);
            json.then(async result => {
                expect(result.status).toEqual("success");
            })
        }
    });
    test("Test values page", async function() {
        const response = await fetch(API_URL + "/values/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(200);
            json.then(async result => {
                expect(result.status).toEqual("success");
            })
        }
    });
    test("Test current page", async function() {
        const response = await fetch(API_URL + "/values/current", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = response.json()
        if (response.ok) {
            expect(response.status).toBe(200);
            json.then(async result => {
                expect(result.status).toEqual("success");
            })
        }
    });
});