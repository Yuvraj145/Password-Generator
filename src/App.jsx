import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*()_+=-{}[]|\\:;\"'<>,.?/";

    for (let i = 0; i < length; i++) {
      let character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }

    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, char, number, generatePassword]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-6">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-700 p-8 rounded-lg shadow-xl transform transition-all duration-500 hover:scale-105 max-w-sm w-full">
        <h1 className="text-3xl font-extrabold text-center text-white mb-6 animate__animated animate__fadeIn">
          Password Generator
        </h1>
        
        {/* Password Display */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            placeholder="Your password will appear here"
            className="w-full px-4 py-3 text-xl font-medium text-gray-700 border-2 border-indigo-500 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-gradient-to-r from-purple-200 to-pink-200 hover:from-purple-300 hover:to-pink-300"
          />
          <button
            onClick={copyPassword}
            className="ml-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Copy
          </button>
        </div>

        <div className="mb-6">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg cursor-pointer"
          />
          <label className="block text-center text-xl font-medium text-gray-700 mt-2">
            Length: {length}
          </label>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={number}
            onChange={() => setNumber((prev) => !prev)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 text-white font-medium">Include Numbers</label>
        </div>

        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            checked={char}
            onChange={() => setChar((prev) => !prev)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 text-white font-medium">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
