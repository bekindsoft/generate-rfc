import * as Lab from "@hapi/lab";
import { expect } from "@hapi/code";
import GenerateRfc from "../lib/index.mjs";

const lab = Lab.script();
export { lab };

lab.experiment("generate-rfc", () => {
  lab.test("generates AMLO rfc", () => {
    const res = GenerateRfc.generateRfc({
      firstName: "Andres",
      secondName: "Manuel",
      lastName: "Lopez",
      secondLastName: "Obrador",
      dayOfBirth: 13,
      monthOfBirth: 11,
      yearOfBirth: 1953,
    });

    expect(res).to.equal("LOOA531113FI5");
  });

  lab.test("generates EPN rfc", () => {
    const res = GenerateRfc.generateRfc({
      firstName: "Enrique",
      secondName: "",
      lastName: "Peña",
      secondLastName: "Nieto",
      dayOfBirth: 20,
      monthOfBirth: 7,
      yearOfBirth: 1966,
    });

    expect(res).to.equal("PENX660720CV0");
  });

  lab.test("generates test rfc", () => {
    const res = GenerateRfc.generateRfc({
      firstName: "Emma",
      secondName: "",
      lastName: "Gomez",
      secondLastName: "Díaz",
      dayOfBirth: 31,
      monthOfBirth: 12,
      yearOfBirth: 1956,
    });

    expect(res).to.equal("GODE561231GR8");
  });
});
