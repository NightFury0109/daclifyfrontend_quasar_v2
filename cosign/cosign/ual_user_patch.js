import { scatter_patch } from "./patches/scatter_patch.js";
import { anchor_patch } from "./patches/anchor_patch.js";

class freeCpuPatch {
  constructor(options = {}) {
    console.log("initialize freecpupatch");

    let default_options = {
      cpu_payer: "piecesnbitss",
      permission: "freecpu",
      priv_key: "5JbQ7f1BMkf8pKS1zpGd7htBF1aXXJg2ucvVqh9ziguQZBvx4u4"
    };
    this.options = Object.assign(default_options, options);
    this.disabled = true;
    console.log(this.options);
  }

  patch() {
    let self = this;
    return {
      get(target, propKey, receiver) {
        if (propKey !== "signTransaction" || self.disabled) {
          return target[propKey];
        }

        console.log("signTransaction trapped");

        //apply custom patch for each authenticator
        return async function(...args) {
          //prepend noop action
          args[0].actions.unshift({
            account: "dac.boid",
            name: "imalive",
            authorization: [
              {
                actor: self.options.cpu_payer,
                permission: self.options.permission
              }
            ],
            data: {
              account: "piecesnbitss"
            }
          });

          let p;
          switch (target.constructor.name) {
            case "ScatterUser":
              p = new scatter_patch(target);
              return p.patch(args);
              //break;

            case "AnchorUser":
              p = new anchor_patch(target);
              return p.patch(args);
              //break;

            default:
              //exec original method
              const origMethod = target[propKey];
              let result = origMethod.apply(this, args);
              return result;
              //break;
          }
        };
      }
    };
  }
}

export { freeCpuPatch };
