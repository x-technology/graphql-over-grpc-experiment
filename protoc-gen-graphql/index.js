#!/usr/bin/env node
const fs = require("fs");
const {
  CodeGeneratorRequest,
  CodeGeneratorResponse,
} = require("google-protobuf/google/protobuf/compiler/plugin_pb");
const protobuf = require("protobufjs");

function generateFile() {
  // console.log('inside')
  // console.log(fs.readFileSync(0).toString())
  const request = CodeGeneratorRequest.deserializeBinary(fs.readFileSync(0));
  const response = new CodeGeneratorResponse();
  // generateCode(request, generator, response);

  protobuf.load("books.proto", function (err, root) {
    if (err) {
      throw err;
    }

    // Obtain a message type
    // console.log(root);
    const Book = root.lookupType("books.Book");

    const file = new CodeGeneratorResponse.File();
    file.setName("output.txt");
    file.setContent("// Code generated by protoc-gen-graphql. DO NOT EDIT.");
    file.setContent(JSON.stringify(root, null, 2));

    response.addFile(file);

    // console.log(1, response.serializeBinary());
    fs.writeFileSync(1, response.serializeBinary());
  });
}

generateFile();
