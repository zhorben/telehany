export default ({ children }) => (
  <main>
    {children}

    <style jsx global>{`
      :root {
        --font-sans: -apple-system, system-ui, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        --geist-foreground: #000;
        --accents-2: #eaeaea;
        --accents-5: #666;
      }

      * {
        box-sizing: inherit;
      }

      html {
        height: 100%;
        box-sizing: border-box;
      }

      body {
        margin: 0;
        font-size: 14px;
        min-height: 100%;
        position: relative;
        text-rendering: optimizeLegibility;
        display: block;
        font-family: var(--font-sans);
      }

      a {
        text-decoration: none;
      }

      a:visited {
        color: initial;
      }

      .input {
        font-size: 14px;
        padding: 4px 10px;
        border-radius: 5px;
        border: 1px solid var(--accents-2);
        transition: border 0.2s ease, color 0.2s ease;
        line-height: 24px;
      }

      .input:focus {
        outline: none;
        border: 1px solid var(--accents-5);
      }

      button {
        border: 0;
        cursor: pointer;
      }

      button:focus {
        outline: none;
      }
    `}</style>
  </main>
)