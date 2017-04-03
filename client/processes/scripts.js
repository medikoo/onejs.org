// Process serving simple aid scripts, which improve UX also when
// application is served via SSR

"use strict";

require("../lib/debug-workaround");

require("../services/top-heading-hash-linker")({ contextSelector: ".markdown" });
require("../services/hash-to-ahref-linker");
