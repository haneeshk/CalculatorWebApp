window.MathJax = {
    loader: {load: ['[tex]/boldsymbol']},
    tex: {
        
        packages: {'[+]': ['base','ams','boldsymbol']},
        macros: {
            u: ["{\\boldsymbol{#1}}", 1],
            pr: ["{\\left( #1\\right)}", 1],
            ag: ["{\\left[ #1\\right]}", 1]
        }
    },
    startup: {
        ready: () => {
            MathJax.startup.defaultReady();

        }
    }
};