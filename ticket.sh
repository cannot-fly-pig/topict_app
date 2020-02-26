#!/bin/bash

curl -X POST https://auth.mimi.fd.ai/v2/token \
  --form-string grant_type="https://auth.mimi.fd.ai/grant_type/application_credentials" \
  --form-string client_id="5a054a082ad94a2e9c0a6af6c7570cbc" \
  --form-string client_secret="bcc51bd8c36909429d0e8d1733d7dec10e7ae6d46d7e1c835323b25e3bda6af607edc6c62219cf3aff240a82d5b9bdf08eabd240c313c2a879d3e13f3f057b92a93e322034d0c1ca62858e69766c0153b124fdb8f21a5bb6aa522adc85a93b04628de2eb73a883594f04ffccdd2875193a1c381523793f91daefe6df99a4969261662cfd0eb48f007d13c2a4a02e52694d8833bd3715fb653d1e97915c8fa7a836d78533911ff48750d61c5fd96aac06aecc7304e23584fbac0e7505079da03d5520c21603b8458c02ae1711fde75244a62bc7ef775358bbd40ca10ec03f3cd7993214f35b5c6583f5bf7047a07640a1eb4419d2baa81df5fdba02be8b750ee8"  \
  --form-string scope="https://apis.mimi.fd.ai/auth/nict-tts/http-api-service;https://apis.mimi.fd.ai/auth/nict-tra/http-api-service;https://apis.mimi.fd.ai/auth/nict-asr/http-api-service;https://apis.mimi.fd.ai/auth/nict-asr/websocket-api-service;https://apis.mimi.fd.ai/auth/applications.r" | jq ".accessToken" | (read res ;echo ${res//\"/}) | (read s; curl https://apis.mimi.fd.ai/v1/applications/counter  -H "Authorization: Bearer ${s}")
