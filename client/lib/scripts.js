// Extra scripts that aid UX
// Should be loaded also not in SPA mode

"use strict";

require("../services/top-heading-hash-linker")({ contextSelector: ".markdown" });
require("../services/hash-to-ahref-linker");

// We force scripted target focus as it doesn't work well natively in non SPA mode
require("../services/on-click-hash-focus-target");
