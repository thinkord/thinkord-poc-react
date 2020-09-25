## Electron and CRA
The purpose of this poc is to refactor the react, because the original code on the thinkord project has a lot of redundancy, it was not designed according to the idea of componentization, let alone the state is very mess. Therefore, I use react hook and HOC to achieve componentization. Additional part of state management, I use context API centralize the state and use pure function to prevent state from mutating. In summary, the overall code maintenance, readability and extension is improved compared to the older project.

[Note]: We do not discuss the addition of css so the interface is not decorated please understand.


