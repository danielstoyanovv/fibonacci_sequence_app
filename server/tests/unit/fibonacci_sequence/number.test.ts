describe("Fibonacci sequence unit tests",  function() {
    const API_NUMBER_URL = "http://localhost:4000/api/v1/fibonacci-sequence-index-number"
    test("Test index number", async function() {
        const data = {
            number: 5
        }
        const response = await fetch(API_NUMBER_URL, {
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
                expect(result.data).not.toBeNull();
                expect(result.data.fibonacciSequenceIndexNumber).toEqual(8);
            })
        }
    });
});