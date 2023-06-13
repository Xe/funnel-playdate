#!/usr/bin/env bash

set -euo pipefail

main() {
    (curl -fsSL https://deno.land/x/install/install.sh | sh) &

    URL=https://gist.githubusercontent.com/Xe/23385ee19cb85c76361298ecb4e7381b/raw/a8834722214e3cb286f15de17ebf052db39b3258/gistfile1.txt

    mkdir -p ~/Desktop/funnelPlaydate
    (cd ~/Desktop/funnelPlaydate && curl $URL | base64 -d | tar xf -) &

    wait

    echo "Open the funnelPlaydate folder on your desktop in VSCode and run the following command in the terminal:"
    echo "  deno task start"
    echo "Then open http://localhost:8000 in your browser"

    if [[ $(uname) == "Darwin" ]]; then
        echo 'alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"' >> ~/.bashrc
        echo 'alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"' >> ~/.zshrc
        echo "DENO_INSTALL=\"\$HOME/.deno\"" >> ~/.bashrc
        echo "DENO_INSTALL=\"\$HOME/.deno\"" >> ~/.zshrc
        echo "PATH=\$PATH:\$DENO_INSTALL/bin" >> ~/.bashrc
        echo "PATH=\$PATH:\$DENO_INSTALL/bin" >> ~/.zshrc
    fi
}

main;