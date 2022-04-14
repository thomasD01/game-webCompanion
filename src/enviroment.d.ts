declare global {
  namespace NodeJS {
    interface ProcessEnv{
      NODE_ENV: 'development' | 'production';
      PORT?:              string;
      PWD:                string;
      APPLE_ID:           string;
      APPLE_SECRET:       string;
      GOOGLE_ID:          string;
      GOOGLE_SECRET:      string;
      PORT_HTTP:          string;
      PORT_HTTPS:         string;
      EMAIL_SERVER_USER:  string;
      EMAIL_SERVER_PASS:  string;
      EMAIL_SERVER_HOST:  string;
      EMAIL_SERVER_PORT:  string;
      EMAIL_FROM:         string;
    }
  }  
}

export{}
