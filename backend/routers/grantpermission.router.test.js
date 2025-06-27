// Must import grantpermissionRouter after setting up mocks for GrantPermissionController
const grantpermissionRouter = require('./grantpermission.router');
const express = require('express');
const supertest = require('supertest');

// Setup testapp with just grantpermissionRouter which calls mocked GrantPermissionController
const testapp = express();
testapp.use(express.json());
testapp.use(express.urlencoded({ extended: false }));
testapp.use('/api/grantpermission', grantpermissionRouter);
const request = supertest(testapp);

describe("Unit tests for grantpermission router", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GoogleDrive", () => {
        let mockObjects = {
            email: "mock_email",
            file: "mock_file",
            credentials: {
                client_secret: "mock_secret",
                client_id: "mock_id",
                redirect_uris: ["mock_uri"]
            }
        };
        it("Should grant permission", async (done) => {
            process.env.GOOGLECREDENTIALS = JSON.stringify({
                client_secret: 'fake_secret',
                client_id: 'fake_id',
                redirect_uris: ['http://localhost', 'http://localhost/oauth2callback'],
              });
            process.env.GOOGLE_ACCESS_TOKEN = 'fake_access_token';
            process.env.GOOGLE_REFRESH_TOKEN = 'fake_refresh_token';
            process.env.GOOGLE_EXPIRY_DATE = '9999999999';
            const response = await request
                .post('/api/grantpermission/googleDrive')
                .send(mockObjects);

            // Test
            // console.log(response.body);
            expect(response.status).toBe(200);
            done()
        })

    });

})