CREATE TABLE account (
  uuid UUID NOT NULL PRIMARY KEY,

  handle VARCHAR(255) NOT NULL UNIQUE,
  
  firstname VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  
  cookie_consent BOOLEAN NULL,
  
  email VARCHAR(255) NOT NULL UNIQUE,
  path VARCHAR(255) NULL,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() at time zone 'utc'::text),

  FOREIGN KEY (uuid) REFERENCES auth.users(id)
);
