# example_docker_application
redis port=6379:6379 (redis default port)

frontend port=5050:8080 (or whatever,I mapped it like that to be able to use jenkins on its default port)

backend port=4203:4203  

usage: docker compose up


![image2 - Copy](https://github.com/user-attachments/assets/2419bff5-04d3-40e6-b41e-5b2501e3300d)


![image4](https://github.com/user-attachments/assets/b964a18f-89c7-4978-8531-208cd6fb8ec7)


# Project Deliverables: 
-Jenkins and Docker environments installed and configured.

-Dockerized application running locally.

-Basic Ansible setup

-CI/CD pipeline plan documented

-Jenkins job that builds Docker images.

-Automated testing included in the pipeline.

-Notifications configured for pipeline updates.

-Ansible playbooks ready and tested.

-Docker images automatically pushed to Docker Hub or a registry. 

-Successful deployment of the application to a Vm.. 

-Fully refined CI/CD pipeline in Jenkins.

-Documented CI/CD pipeline process.

-Final deployment verified and tested on the Vms

-Working Jenkins pipeline triggered by Git commits.

# what i've done in this project :
•	Divided this application into two main folders to test each one separately (Frontend & Backend).

•	Used Redis Docker image as the database for this application.

•	Wrote Dockerfiles to run frontend and backend.

•	Wrote Docker-compose.yml file to build frontend, backend images and run Redis image in order (according to their dependencies).

•	Pushed the application directory to Github private repository using SSH agent.

•	Configured Jenkins pipeline item to clone and test this private repository automatically triggered by commits.

•	Configured Ansible playbook to install dependencies, copy the cloned repository , deploy it to targeted machines.

