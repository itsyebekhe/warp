// This is a self-contained Cloudflare Worker.
// It includes the LZ-String library directly to avoid multiple files.

// We define a function that contains the entire library.
// When called, it returns the fully initialized LZString object.
function getLzString() {
  // START LZ-STRING LIBRARY CODE (do not modify this part)
  // This code is designed to create a global `LZString` variable.
  // We will capture it and return it from this function.
  var f = String.fromCharCode;
  var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
  var baseReverseDic = {};

  function getBaseValue(alphabet, character) {
      if (!baseReverseDic[alphabet]) {
          baseReverseDic[alphabet] = {};
          for (var i = 0; i < alphabet.length; i++) {
              baseReverseDic[alphabet][alphabet.charAt(i)] = i
          }
      }
      return baseReverseDic[alphabet][character]
  }
  var LZString = {
      compressToBase64: function(input) {
          if (input == null) return "";
          var res = LZString._compress(input, 6, function(a) {
              return keyStrBase64.charAt(a)
          });
          switch (res.length % 4) {
              default:
              case 0:
                  return res;
              case 1:
                  return res + "===";
              case 2:
                  return res + "==";
              case 3:
                  return res + "="
          }
      },
      decompressFromBase64: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          return LZString._decompress(input.length, 32, function(index) {
              return getBaseValue(keyStrBase64, input.charAt(index))
          })
      },
      compressToUTF16: function(input) {
          if (input == null) return "";
          return LZString._compress(input, 15, function(a) {
              return f(a + 32)
          }) + " "
      },
      decompressFromUTF16: function(compressed) {
          if (compressed == null) return "";
          if (compressed == "") return null;
          return LZString._decompress(compressed.length, 16384, function(index) {
              return compressed.charCodeAt(index) - 32
          })
      },
      compressToUint8Array: function(uncompressed) {
          var compressed = LZString.compress(uncompressed);
          var buf = new Uint8Array(compressed.length * 2);
          for (var i = 0, TotalLen = compressed.length; i < TotalLen; i++) {
              var current_value = compressed.charCodeAt(i);
              buf[i * 2] = current_value >>> 8;
              buf[i * 2 + 1] = current_value % 256
          }
          return buf
      },
      decompressFromUint8Array: function(compressed) {
          if (compressed === null || compressed === undefined) {
              return LZString.decompress(compressed)
          } else {
              var buf = new Array(compressed.length / 2);
              for (var i = 0, TotalLen = buf.length; i < TotalLen; i++) {
                  buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1]
              }
              var result = [];
              buf.forEach(function(c) {
                  result.push(f(c))
              });
              return LZString.decompress(result.join(''))
          }
      },
      compressToEncodedURIComponent: function(input) {
          if (input == null) return "";
          return LZString._compress(input, 6, function(a) {
              return keyStrUriSafe.charAt(a)
          })
      },
      decompressFromEncodedURIComponent: function(input) {
          if (input == null) return "";
          if (input == "") return null;
          input = input.replace(/ /g, "+");
          return LZString._decompress(input.length, 32, function(index) {
              return getBaseValue(keyStrUriSafe, input.charAt(index))
          })
      },
      compress: function(uncompressed) {
          return LZString._compress(uncompressed, 16, function(a) {
              return f(a)
          })
      },
      _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
          if (uncompressed == null) return "";
          var i, value, context_dictionary = {},
              context_dictionaryToCreate = {},
              context_c = "",
              context_wc = "",
              context_w = "",
              context_enlargeIn = 2,
              context_dictSize = 3,
              context_numBits = 2,
              context_data = [],
              context_data_val = 0,
              context_data_position = 0,
              ii;
          for (ii = 0; ii < uncompressed.length; ii += 1) {
              context_c = uncompressed.charAt(ii);
              if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                  context_dictionary[context_c] = context_dictSize++;
                  context_dictionaryToCreate[context_c] = true
              }
              context_wc = context_w + context_c;
              if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                  context_w = context_wc
              } else {
                  if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                      if (context_w.charCodeAt(0) < 256) {
                          for (i = 0; i < context_numBits; i++) {
                              context_data_val = context_data_val << 1;
                              if (context_data_position == bitsPerChar - 1) {
                                  context_data_position = 0;
                                  context_data.push(getCharFromInt(context_data_val));
                                  context_data_val = 0
                              } else {
                                  context_data_position++
                              }
                          }
                          value = context_w.charCodeAt(0);
                          for (i = 0; i < 8; i++) {
                              context_data_val = context_data_val << 1 | value & 1;
                              if (context_data_position == bitsPerChar - 1) {
                                  context_data_position = 0;
                                  context_data.push(getCharFromInt(context_data_val));
                                  context_data_val = 0
                              } else {
                                  context_data_position++
                              }
                              value = value >> 1
                          }
                      } else {
                          value = 1;
                          for (i = 0; i < context_numBits; i++) {
                              context_data_val = context_data_val << 1 | value;
                              if (context_data_position == bitsPerChar - 1) {
                                  context_data_position = 0;
                                  context_data.push(getCharFromInt(context_data_val));
                                  context_data_val = 0
                              } else {
                                  context_data_position++
                              }
                              value = 0
                          }
                          value = context_w.charCodeAt(0);
                          for (i = 0; i < 16; i++) {
                              context_data_val = context_data_val << 1 | value & 1;
                              if (context_data_position == bitsPerChar - 1) {
                                  context_data_position = 0;
                                  context_data.push(getCharFromInt(context_data_val));
                                  context_data_val = 0
                              } else {
                                  context_data_position++
                              }
                              value = value >> 1
                          }
                      }
                      context_enlargeIn--;
                      if (context_enlargeIn == 0) {
                          context_enlargeIn = Math.pow(2, context_numBits);
                          context_numBits++
                      }
                      delete context_dictionaryToCreate[context_w]
                  } else {
                      value = context_dictionary[context_w];
                      for (i = 0; i < context_numBits; i++) {
                          context_data_val = context_data_val << 1 | value & 1;
                          if (context_data_position == bitsPerChar - 1) {
                              context_data_position = 0;
                              context_data.push(getCharFromInt(context_data_val));
                              context_data_val = 0
                          } else {
                              context_data_position++
                          }
                          value = value >> 1
                      }
                  }
                  context_enlargeIn--;
                  if (context_enlargeIn == 0) {
                      context_enlargeIn = Math.pow(2, context_numBits);
                      context_numBits++
                  }
                  context_dictionary[context_wc] = context_dictSize++;
                  context_w = String(context_c)
              }
          }
          if (context_w !== "") {
              if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                  if (context_w.charCodeAt(0) < 256) {
                      for (i = 0; i < context_numBits; i++) {
                          context_data_val = context_data_val << 1;
                          if (context_data_position == bitsPerChar - 1) {
                              context_data_position = 0;
                              context_data.push(getCharFromInt(context_data_val));
                              context_data_val = 0
                          } else {
                              context_data_position++
                          }
                      }
                      value = context_w.charCodeAt(0);
                      for (i = 0; i < 8; i++) {
                          context_data_val = context_data_val << 1 | value & 1;
                          if (context_data_position == bitsPerChar - 1) {
                              context_data_position = 0;
                              context_data.push(getCharFromInt(context_data_val));
                              context_data_val = 0
                          } else {
                              context_data_position++
                          }
                          value = value >> 1
                      }
                  } else {
                      value = 1;
                      for (i = 0; i < context_numBits; i++) {
                          context_data_val = context_data_val << 1 | value;
                          if (context_data_position == bitsPerChar - 1) {
                              context_data_position = 0;
                              context_data.push(getCharFromInt(context_data_val));
                              context_data_val = 0
                          } else {
                              context_data_position++
                          }
                          value = 0
                      }
                      value = context_w.charCodeAt(0);
                      for (i = 0; i < 16; i++) {
                          context_data_val = context_data_val << 1 | value & 1;
                          if (context_data_position == bitsPerChar - 1) {
                              context_data_position = 0;
                              context_data.push(getCharFromInt(context_data_val));
                              context_data_val = 0
                          } else {
                              context_data_position++
                          }
                          value = value >> 1
                      }
                  }
                  context_enlargeIn--;
                  if (context_enlargeIn == 0) {
                      context_enlargeIn = Math.pow(2, context_numBits);
                      context_numBits++
                  }
                  delete context_dictionaryToCreate[context_w]
              } else {
                  value = context_dictionary[context_w];
                  for (i = 0; i < context_numBits; i++) {
                      context_data_val = context_data_val << 1 | value & 1;
                      if (context_data_position == bitsPerChar - 1) {
                          context_data_position = 0;
                          context_data.push(getCharFromInt(context_data_val));
                          context_data_val = 0
                      } else {
                          context_data_position++
                      }
                      value = value >> 1
                  }
              }
              context_enlargeIn--;
              if (context_enlargeIn == 0) {
                  context_enlargeIn = Math.pow(2, context_numBits);
                  context_numBits++
              }
          }
          value = 2;
          for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1 | value & 1;
              if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0
              } else {
                  context_data_position++
              }
              value = value >> 1
          }
          while (true) {
              context_data_val = context_data_val << 1;
              if (context_data_position == bitsPerChar - 1) {
                  context_data.push(getCharFromInt(context_data_val));
                  break
              } else context_data_position++
          }
          return context_data.join('')
      },
      _decompress: function(length, resetValue, getNextValue) {
          var dictionary = [],
              next, enlargeIn = 4,
              dictSize = 4,
              numBits = 3,
              entry = "",
              result = [],
              i, w, bits, resb, maxpower, power, c, data = {
                  val: getNextValue(0),
                  position: resetValue,
                  index: 1
              };
          for (i = 0; i < 3; i += 1) {
              dictionary[i] = i
          }
          bits = 0;
          maxpower = Math.pow(2, 2);
          power = 1;
          while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                  data.position = resetValue;
                  data.val = getNextValue(data.index++)
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1
          }
          switch (next = bits) {
              case 0:
                  bits = 0;
                  maxpower = Math.pow(2, 8);
                  power = 1;
                  while (power != maxpower) {
                      resb = data.val & data.position;
                      data.position >>= 1;
                      if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++)
                      }
                      bits |= (resb > 0 ? 1 : 0) * power;
                      power <<= 1
                  }
                  c = f(bits);
                  break;
              case 1:
                  bits = 0;
                  maxpower = Math.pow(2, 16);
                  power = 1;
                  while (power != maxpower) {
                      resb = data.val & data.position;
                      data.position >>= 1;
                      if (data.position == 0) {
                          data.position = resetValue;
                          data.val = getNextValue(data.index++)
                      }
                      bits |= (resb > 0 ? 1 : 0) * power;
                      power <<= 1
                  }
                  c = f(bits);
                  break;
              case 2:
                  return ""
          }
          dictionary[3] = c;
          w = c;
          result.push(c);
          while (true) {
              if (data.index > length) {
                  return ""
              }
              bits = 0;
              maxpower = Math.pow(2, numBits);
              power = 1;
              while (power != maxpower) {
                  resb = data.val & data.position;
                  data.position >>= 1;
                  if (data.position == 0) {
                      data.position = resetValue;
                      data.val = getNextValue(data.index++)
                  }
                  bits |= (resb > 0 ? 1 : 0) * power;
                  power <<= 1
              }
              switch (c = bits) {
                  case 0:
                      bits = 0;
                      maxpower = Math.pow(2, 8);
                      power = 1;
                      while (power != maxpower) {
                          resb = data.val & data.position;
                          data.position >>= 1;
                          if (data.position == 0) {
                              data.position = resetValue;
                              data.val = getNextValue(data.index++)
                          }
                          bits |= (resb > 0 ? 1 : 0) * power;
                          power <<= 1
                      }
                      dictionary[dictSize++] = f(bits);
                      c = dictSize - 1;
                      enlargeIn--;
                      break;
                  case 1:
                      bits = 0;
                      maxpower = Math.pow(2, 16);
                      power = 1;
                      while (power != maxpower) {
                          resb = data.val & data.position;
                          data.position >>= 1;
                          if (data.position == 0) {
                              data.position = resetValue;
                              data.val = getNextValue(data.index++)
                          }
                          bits |= (resb > 0 ? 1 : 0) * power;
                          power <<= 1
                      }
                      dictionary[dictSize++] = f(bits);
                      c = dictSize - 1;
                      enlargeIn--;
                      break;
                  case 2:
                      return result.join('')
              }
              if (enlargeIn == 0) {
                  enlargeIn = Math.pow(2, numBits);
                  numBits++
              }
              if (dictionary[c]) {
                  entry = dictionary[c]
              } else {
                  if (c === dictSize) {
                      entry = w + w.charAt(0)
                  } else {
                      return null
                  }
              }
              result.push(entry);
              dictionary[dictSize++] = w + entry.charAt(0);
              enlargeIn--;
              w = entry;
              if (enlargeIn == 0) {
                  enlargeIn = Math.pow(2, numBits);
                  numBits++
              }
          }
      }
  };
  return LZString;
}
// END OF LIBRARY FUNCTION

/*************************************************************************************/
/*                            MAIN WORKER LOGIC STARTS HERE                          */
/*************************************************************************************/

export default {
  async fetch(request, env, ctx) {
      const LZString = getLzString();
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/').filter(p => p);

      // NEW: URL format is now /sub/{client_type}/{data}
      if (pathParts[0] !== 'sub' || pathParts.length < 3) {
          return new Response("Not Found. Use /sub/{client_type}/{data} format.", { status: 404 });
      }

      const clientType = pathParts[1];
      const encodedData = pathParts[2];

      try {
          let accounts;
          try {
              const compressedJson = LZString.decompressFromEncodedURIComponent(encodedData);
              if (!compressedJson) throw new Error("Decompression resulted in empty data.");
              accounts = JSON.parse(compressedJson);
          } catch (e) {
              throw new Error("Failed to parse account data. " + e.message);
          }

          if (!Array.isArray(accounts) || accounts.length === 0) {
              return new Response("No valid account data found in payload.", { status: 400 });
          }

          const endpointResponse = await fetch('https://raw.githubusercontent.com/ircfspace/endpoint/main/ip.json', {
              headers: { 'User-Agent': 'WARP-Subscription-Worker/2.0' }
          });
          if (!endpointResponse.ok) throw new Error("Could not fetch endpoints.");
          const endpointData = await endpointResponse.json();

          // NEW: Use all available IPv4 and IPv6 endpoints
          const allEndpoints = [...(endpointData.ipv4 || []), ...(endpointData.ipv6 || [])]
              .filter(ip => typeof ip === 'string' && ip.length > 0)
              .sort(() => 0.5 - Math.random());

          if (allEndpoints.length === 0) {
              allEndpoints.push("162.159.192.1:2408"); // Add a fallback
          }

          const configLines = accounts.flatMap(account => {
              if (!account || !account.privateKey || !account.v4 || !account.v6 || !account.peerPublicKey || !Array.isArray(account.reserved)) {
                  return []; // Use flatMap to easily skip invalid accounts
              }
              
              const { privateKey, v4, v6, peerPublicKey, reserved } = account;
              const addressesWithCidr = `${v4}/32,${v6}/128`;
              const addressesNoCidr = `${v4},${v6}`;
              const encodedPrivateKey = encodeURIComponent(privateKey);
              const encodedPeerPubKey = encodeURIComponent(peerPublicKey);
              const encodedReserved = encodeURIComponent(reserved.join(','));

              // Generate a config for every available endpoint for this one account
              return allEndpoints.map((endpoint, index) => {
                  const name = `${clientType}-WARP-${account.v4.split('.')[3]}-${index + 1}`;
                  const encodedName = encodeURIComponent(name);

                  switch (clientType) {
                      case 'v2rayng':
                          return `wireguard://${encodedPrivateKey}@${endpoint}?address=${encodeURIComponent(addressesWithCidr)}&reserved=${encodedReserved}&publickey=${encodedPeerPubKey}&mtu=1280#${encodedName}`;
                      case 'streisand':
                           return `wireguard://${endpoint}?private_key=${encodedPrivateKey}&peer_public_key=${encodedPeerPubKey}&mtu=1280&address=${encodeURIComponent(addressesWithCidr)}&reserved=${encodedReserved}`;
                      case 'shadowrocket-std':
                           return `wg://${endpoint}?publicKey=${encodedPeerPubKey}&privateKey=${encodedPrivateKey}&ip=${encodeURIComponent(addressesNoCidr)}&mtu=1280&dns=1.1.1.1&udp=1&reserved=${encodedReserved}#${encodedName}`;
                      default:
                          return null; // This will be filtered out
                  }
              });
          }).filter(line => line !== null);

          if (configLines.length === 0) {
              throw new Error(`Client type '${clientType}' is not supported or no valid configs could be generated.`);
          }

          const subscriptionContent = configLines.join('\n');
          return new Response(subscriptionContent, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

      } catch (error) {
          console.error("Worker Execution Error:", error.stack);
          return new Response(`Error generating subscription: ${error.message}`, { status: 500 });
      }
  },
};
