import http from 'k6/http';
import encoding from 'k6/encoding';
import { check, sleep } from 'k6';

/* To run this test case, it is necessary 
to obtain the credentials in the https://auth0.com/ application 
and replace it in this file*/

const CREDENTIALS = {
    client_id: "{{your_client_id}}",
    client_secret: "{{your_client_secret}}",
    user: "{{your_user}}"
}

export default function () {
    const url = `https://${CREDENTIALS.user}.us.auth0.com/oauth/token`;

    const data = JSON.stringify({
        client_id: CREDENTIALS.client_id,
        client_secret: CREDENTIALS.client_secret,
        audience: `https://${CREDENTIALS.user}.us.auth0.com/api/v2/`,
        grant_type: "client_credentials"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let res = http.post(url, data, params);

    check(res, {
        'success login': (r) => r.status === 200,
        'valid token': (r) => extractInfoAuth((JSON.parse(res.body)).access_token).sub.
            includes(JSON.parse(r.request.body).client_id)
    });

    sleep(0.3);
}

export function extractInfoAuth(token) {
    let tokenExtracted = JSON.parse(encoding.b64decode(token.split('.')[1], 'rawstd', 's'));
    return tokenExtracted
}
