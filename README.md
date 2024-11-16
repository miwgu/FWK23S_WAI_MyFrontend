# FWK23S_WAI_MyFrontend (Admin)
## How to start (React.js)
npm install
react-google-recaptcha, react-icons, react-router-dom
### Docker Container Setup for `fwk-front`
1. Install Docker desktop
2. Before running the container, create a custom Docker network.
```bash
docker network create --subnet=172.20.0.0/24 fwk-net
docker network ls
docker inspect fwk-net

---

This guide helps you build and run a Docker container for the `fwk-front` project. Follow the steps below to get started.
- creates a Docker image based on the instructions in a Dockerfile in the current directory.
docker build -t fwk-front .

- creates and starts a container based on the specified image.
docker run --name fwk-front --network fwk-net --ip 172.20.0.3 -p 5000:5000 -d fwk-front

## Log in 
- admin: admin@example.com  password:1234
- user1: user1@example.com  password:2345 (You are not Admin) -> you cannot login to Admin app
