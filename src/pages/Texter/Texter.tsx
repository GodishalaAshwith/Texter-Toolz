import "./Texter.css";

const Texter = () => {
  return (
    <>
      <header>
        <h1>Texter Tool</h1>
      </header>
      <main>
        <div className="input-field">
          <form>
            <label for="message">Enter your message:</label>
            <textarea
              id="message"
              name="message"
              rows="10"
              cols="50"
            ></textarea>
          </form>
        </div>
      </main>
    </>
  );
};

export default Texter;
