console.log("Cluster initialization")
kubectl apply -f k8s
kubectl set image deployments/server-deployment server=stoyanov1234/fib-server:$SHA
kubectl set image deployments/client-deployment client=stoyanov1234/fib-client:$SHA