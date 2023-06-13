# Funnel Playdate

Hey all! Welcome to the funnel playdate. Today I'm going to run you through some basic usage of funnel and how you can use it with your team.

Normally, when you share things on a tailnet those things are only visible to people on your team. This allows you to share things internally, but sometimes you need more. Sometimes you need to demo changes to partners or customers. Funnel lets you expose programs running on your tailnet to the public Internet.

Today we're gonna play with Funnel and learn about the cool things you can do with it.

* Install VSCode if not installed already
* Install Tailscale if not installed already
  * If so, how?
* Authenticate to a personal tailnet
  * Roll a tailnet name
  * Enable HTTPS
* Run project setup magic script
  * Ensure `tailscale` alias is set up on macs
* Open project in VS Code
  * Start it
  * Set up my copy in a VM
* Start demonstrating how you can change things and watch the output change instantly
* Change my screen share to my admin view
  * Talk about how I have a table of everyone's projects so we can keep an eye on them
* Set up `tailscale serve`
  * Go back to VS Code and set up `tailscale serve`
  * Serve your app
  * Test in your browser
  * It takes longer the first time because it has to acquire the cert
* Getting funnel set up
  * Enable in admin panel
  * Enable with the tailscale CLI app
* Go back to my admin view and ask someone to change their website
  * Demonstrate it live
* Et voila!
  * That's the magic of funnel.