const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readline = require('readline');
const process = require('process');
const keypress = require('keypress');

const main = async () => {
    //Création d'un objet readline avec flux d'entrée et flux de sortie
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt : "=>"
    });

    keypress(process.stdin);

    // lance l'interface du shell
    rl.prompt()

    process.stdin.on('keypress', function (ch, key) {
        if (key && key.ctrl && key.name == 'p') {
        process.exit();
        }
    });
  
    process.stdin.setRawMode(true);
    process.stdin.resume();

    rl.on('line', async (line) => {
        if (line == 'exit') {
            process.exit()
        }
        else if (line == 'lp'){
            try {
                const { stdout } = await exec('tasklist');
                console.log(stdout);
            } catch (err) {
                console.log(err);
            }
        }
        else if (line == 'cmd'){
            try {
                const { stdout } = await exec('cmd');
                console.log(stdout);
            } catch (err) {
                console.log(err);
            }
        }
        else if (line.slice(0,4) == 'kill'){
            if (line.slice(5,9) == 'Name'){
                var name = line.slice(10);
                try {
                    const { stdout } = await exec(`taskkill/IM "${name}" /F`);
                    console.log(stdout);
                } catch (err) {
                    console.log(err);
                }
            }
            else if (line.slice(5,8) == 'Pid'){
                var pid = line.slice(9);
                try {
                    const { stdout } = await exec(`taskkill/pid "${pid}" /F`);
                    console.log(stdout);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        else if (line.slice(0,4) == 'ping'){
            var ipaddress = line.slice(5);
            try {
                const { stdout } = await exec(`ping ${ipaddress}`);
                console.log(stdout);
            } catch (err) {
                console.log(err);
            }
        }
        else if (line == 'ls'){
            try {
                const { stdout } = await exec(`dir`);
                console.log(stdout);
            } catch (err) {
                console.log(err);
            }
        }
        else if (line.slice(0,2) == 'cd'){
            var path = line.slice(3);
            try {
                const { stdout } = await exec(`cd ${path}`);
                console.log(stdout);
            } catch (err) {
                console.log(err);
            }
        }
        else if (line == 'nique ta mere'){
            console.log("Celui qui dit qui l'est")
        }
        else{
            console.log("Commande introuvable")
        }
        rl.prompt()
    });
}

main();
