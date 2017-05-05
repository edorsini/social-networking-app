# Deployment

This document describes the deployment process.

## Technologies

FriendZone is hosted in the cloud using Amazon Web Services. Routing to front-end and back-end is
done via NGINX reverse proxy.

## Amazon

1. Sign up for an account at https://aws.amazon.com. Note that this will require a credit card, but
there is a Free Tier of services that have no cost for the first year, provided you stay under
certain usage limits.

2. Follow [this Amazon tutorial](https://aws.amazon.com/getting-started/tutorials/launch-a-virtual-machine/)
for creating a free virtual machine instance.
    * When selecting an OS, choose Ubuntu.
    * When configuring security groups, choose to allow HTTP traffic (port 80).

3. Optionally, follow [this Amazon tutorial](https://aws.amazon.com/getting-started/tutorials/get-a-domain/)
for registering a domain name. *Note*: Domain name registration is not free.

4. Change `frontEndUrl` in the `back-end/configuation/production/properties.json` file and
`API_URL` in the `front-end/configuration/properties.json` file to match your server IP or domain name.

5. Update the Facebook and Google apps to support OAuth to your server. See the
(OAuth README)[README_oauth.md] for more information.

## Ubuntu configuration

1. Connect to the instance via SSH and run `sudo apt-get update`.

2. Install NGINX:
    * `sudo apt-get install nginx`
    * You can verify NGINX is working by going to http://server_ip, you should see a landing page.

3. Prepare front-end static directories:
    * `sudo mkdir /var/www/friendzone`
    * `sudo mkdir /var/www/friendzone-images`
    * `sudo chown ubuntu /var/www/friendzone-images`
    
4. Follow [this guide](https://www.howtoforge.com/tutorial/install-mongodb-on-ubuntu-16.04/) for installing MongoDB.

5. Install Node.js:
    * `curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`
    * `sudo apt-get install -y nodejs`
    
6. Install [forever](https://github.com/foreverjs/forever)
    * `sudo npm install forever -g`
    
## Deploy

1. From your dev environment, checkout the master branch, or a particular release tag
    * `git checkout master`
    * `git pull`
    
2. Build the front-end for production:
    * `cd front-end`
    * `gulp clean`
    * `NODE_ENV=production gulp build`
    * `cd ..`
    
3. Copy the backend and the front-end to the server:
    * `tar -czvf friendzone.tar.gz back-end/ front-end/dist/`
    * `scp friendzone.tar.gz ubuntu@server_ip:/home/ubuntu`

4. On the server, extract the copied tar file
    * `tar -xzvf friendzone.tar.gz`

5. Move the dist folder contents to the nginx static files directory:
    * `sudo rm -rf /var/www/friendzone/*`
    * `sudo mv dist/* /var/www/friendzone/`
    
6. Copy the NGINX config file to the NGINX directory:
    * `back-end/configuration/production/friendzone.nginx /etc/nginx/sites-available/friendzone`
    
7. Disable the default site and enable friendzone
    * `sudo rm /etc/nginx/sites-enabled/default`
    * `sudo ln -s /etc/nginx/sites-available/friendzone /etc/nginx/sites-enabled/friendzone`
    
8. Restart NGINX
    * `sudo service nginx restart`
    
9. Start the back-end
    * `cd back-end`
    * `npm install`
    * `NODE_ENV=production forever start server.js`
    
The app should now be accessible at http://server_ip