import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<boolean>(false);
  useEffect(() => {
    if (router.query.data && typeof router.query.data === "string") {
      const data = JSON.parse(router.query.data);
      update(data.join("\n"));
      setStatus(true);
    }
  }, [router]);
  const [text, setText] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const getFalse = (len: number) => {
    let arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(false);
    }
    return arr;
  };
  const formatText = (text: string[]) => {
    const newText = `const selectSox = ${JSON.stringify(text)}
  const check = ${JSON.stringify(getFalse(text.length))}
  
  const tbody =
    document.getElementById("page-wrapper").firstChild.nextSibling.nextSibling
      .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild
      .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
      .nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild
      .nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild
      .nextSibling;
  
  const length = tbody.childNodes.length
  for (let i = 0; i < length; i++) {
    try {
      const text = tbody.childNodes[i].children[1].innerText
      for (let j = 0; j < selectSox.length; j++) {
        if (text === selectSox[j]) {
          check[j] = true
          tbody.childNodes[i].click()
        }
      }
    } catch {
      continue
    }
  }
  
  let donthave = ""
  
  for (let i = 0; i < selectSox.length; i++) {
    if (check[i] === false) {
      donthave += selectSox[i] + " "
    }
  }
  window.scrollTo({ left: 0, top: document.body.scrollHeight})
  console.log(donthave)`;
    return newText;
  };

  const formatText2 = (text: string[]) => {
    const newText = `const selectSox = ${JSON.stringify(text)}
  const check = ${JSON.stringify(getFalse(text.length))}
  
  const tbody =
  document.getElementById("page-wrapper").firstChild.nextSibling.nextSibling
    .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild
    .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling
    .nextSibling.nextSibling.nextSibling.firstChild.nextSibling.firstChild
    .nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild
    .nextSibling.nextSibling.nextSibling.firstChild.nextSibling;
  
  const length = tbody.childNodes.length
  for (let i = 0; i < length; i++) {
    try {
      const text = tbody.childNodes[i].children[0].innerText
      for (let j = 0; j < selectSox.length; j++) {
        if (text === selectSox[j]) {
          check[j] = true
          tbody.childNodes[i].children[0].click()
        }
      }
    } catch {
      continue
    }
  }
  
  let donthave = ""
  
  for (let i = 0; i < selectSox.length; i++) {
    if (check[i] === false) {
      donthave += selectSox[i] + " "
    }
  }
  window.scrollTo({ left: 0, top: document.body.scrollHeight})
  console.log(donthave)`;
    return newText;
  };

  const update = (text: string) => {
    if (text === "") {
      return;
    }
    let data = text.split(/\r?\n/);
    while (data[data.length - 1] === "") {
      data.pop();
      if (data.length === 0) {
        setText("");
        setText2("");
        return;
      }
    }
    const newData = data.map((val: string) => {
      if (val.length === 3) {
        return "SOX-00" + val;
      } else if (val.length === 4) {
        return "SOX-0" + val;
      } else if (val.length === 5) {
        return "SOX-" + val;
      } else {
        return val;
      }
    });
    setText(formatText(newData));
    setText2(formatText2(newData));
  };
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center h-full">
        <div className="flex items-center h-full w-full max-w-5xl">
          <textarea
            className="border border-gray-900 text-lg mx-4 w-80 h-full"
            onChange={(e) => {
              update(e.target.value);
            }}
            disabled={status}
          ></textarea>
          <div className="flex flex-col h-screen w-full mx-4">
            <p className="font-bold text-lg">ใบจัดเตรียม, IRD</p>
            <textarea
              className="border border-gray-900 text-lg w-full h-full font-mono"
              value={text}
            ></textarea>
          </div>
          <div className="flex flex-col h-screen w-full mx-4">
            <p className="font-bold text-lg">Confirm Shipping</p>
            <textarea
              className="border border-gray-900 text-lg w-full h-full font-mono"
              value={text2}
            ></textarea>
          </div>
        </div>
        {/* <button className="w-full h-32 bg-gray-300">Compile</button> */}
      </div>
    </div>
  );
};

export default IndexPage;
