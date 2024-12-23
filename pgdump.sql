--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: car; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.car (
    id integer NOT NULL,
    license_plate text NOT NULL,
    model text NOT NULL,
    user_id text NOT NULL,
    organisation_id integer NOT NULL
);


ALTER TABLE public.car OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.car_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.car_id_seq OWNER TO postgres;

--
-- Name: car_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.car_id_seq OWNED BY public.car.id;


--
-- Name: delegation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.delegation (
    id integer NOT NULL,
    user_id text NOT NULL,
    description text,
    diet_count integer,
    status text DEFAULT 'active'::text NOT NULL
);


ALTER TABLE public.delegation OWNER TO postgres;

--
-- Name: delegation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.delegation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.delegation_id_seq OWNER TO postgres;

--
-- Name: delegation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.delegation_id_seq OWNED BY public.delegation.id;


--
-- Name: organisation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisation (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.organisation OWNER TO postgres;

--
-- Name: organisation_organisation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organisation_organisation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organisation_organisation_id_seq OWNER TO postgres;

--
-- Name: organisation_organisation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organisation_organisation_id_seq OWNED BY public.organisation.id;


--
-- Name: trip; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip (
    id integer NOT NULL,
    delegation_id integer NOT NULL,
    start_time timestamp with time zone DEFAULT now() NOT NULL,
    end_time timestamp with time zone,
    start_location text NOT NULL,
    end_location text,
    trip_description text,
    start_meter integer NOT NULL,
    end_meter integer,
    car_id integer NOT NULL,
    user_id text NOT NULL,
    last_updated timestamp without time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'active'::text NOT NULL
);


ALTER TABLE public.trip OWNER TO postgres;

--
-- Name: trip_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_trip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_trip_id_seq OWNER TO postgres;

--
-- Name: trip_trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_trip_id_seq OWNED BY public.trip.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    organisation_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: car id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car ALTER COLUMN id SET DEFAULT nextval('public.car_id_seq'::regclass);


--
-- Name: delegation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delegation ALTER COLUMN id SET DEFAULT nextval('public.delegation_id_seq'::regclass);


--
-- Name: organisation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisation ALTER COLUMN id SET DEFAULT nextval('public.organisation_organisation_id_seq'::regclass);


--
-- Name: trip id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip ALTER COLUMN id SET DEFAULT nextval('public.trip_trip_id_seq'::regclass);


--
-- Data for Name: car; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.car (id, license_plate, model, user_id, organisation_id) FROM stdin;
1	EL5KS79	Trafic	1827463526172836	1
2	EL2EW47	Elatnra	1827463526172836	1
\.


--
-- Data for Name: delegation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.delegation (id, user_id, description, diet_count, status) FROM stdin;
1	1827463526172836	Odbiór Traffic	0	completed
2	1827463526172836	Warszawa/Lublin/Rzeszów 	1	completed
3	1827463526172836	Gdańsk	1	completed
4	1827463526172836	Lublin	1	completed
5	1827463526172836	Poznań	1	completed
6	1827463526172836	Września diagnoza	1	completed
7	1827463526172836	Radom	0	completed
8	1827463526172836	Radom	0	complete
9	1827463526172836	\N	\N	active
\.


--
-- Data for Name: organisation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisation (id, name) FROM stdin;
1	Mirai Technology $ Service
\.


--
-- Data for Name: trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip (id, delegation_id, start_time, end_time, start_location, end_location, trip_description, start_meter, end_meter, car_id, user_id, last_updated, status) FROM stdin;
4	2	2024-08-08 20:10:00+02	2024-08-08 22:45:00+02	Lublin	Rzeszów	\N	440	645	1	1827463526172836	2024-08-22 10:55:26.071094	completed
3	2	2024-08-08 14:17:00+02	2024-08-08 14:17:00+02	Warszawa	Lublin	\N	270	440	1	1827463526172836	2024-08-22 10:53:49.805319	completed
11	5	2024-10-18 15:01:02.229+02	2024-10-09 21:10:02.229+02	Poznań	Września	Serwis Września	3200	3550	1	1827463526172836	2024-10-17 18:40:02.229747	completed
14	6	2024-12-14 10:01:02.229+01	2024-12-14 15:01:02.229+01	Chrzanów	Września	-	3308	3713	1	1827463526172836	2024-10-17 18:40:02.229747	completed
15	6	2024-12-14 19:01:02.229+01	2024-12-14 23:01:02.229+01	Września	Chrzanów	-	3713	4174	1	1827463526172836	2024-10-17 18:40:02.229	completed
19	8	2024-12-18 11:30:00+01	2024-12-18 13:35:00+01	Wola Grzymalina Kolonia	Radom	\N	4709	4861	1	1827463526172836	2024-12-19 19:18:23.414894	completed
20	8	2024-12-18 17:20:00+01	2024-12-18 18:20:00+01	Radom	Huta Żabiowska	\N	4861	4938	1	1827463526172836	2024-12-19 19:21:16.059995	completed
22	8	2024-12-19 12:39:00+01	2024-12-19 14:30:00+01	Pruszków	Wola Grzymalina Kolonia	\N	4972	5138	1	1827463526172836	2024-12-19 19:23:41.14364	completed
21	8	2024-12-19 10:15:00+01	2024-12-19 10:45:00+01	Huta Żabiowska	Pruszków	\N	4938	4972	1	1827463526172836	2024-12-19 19:22:59.328488	completed
1	1	2024-07-19 17:44:00+02	2024-07-19 19:45:00+02	Łódź	Wola Grzymalina Kolonia	\N	0	100	1	1827463526172836	2024-08-22 10:47:57.711147	completed
2	2	2024-08-07 15:15:00+02	2024-08-07 17:15:00+02	Wola Grzymalina Kolonia	Warszawa	\N	100	270	1	1827463526172836	2024-08-22 10:52:22.56868	completed
5	2	2024-08-10 14:20:00+02	2024-08-10 19:35:00+02	Rzeszów	Wola Grzymalina Kolonia	\N	645	1024	1	1827463526172836	2024-08-22 10:57:19.034029	completed
6	3	2024-09-25 18:39:13.544+02	2024-09-25 23:55:13.544+02	Wola Grzymalina Kolonia	Gdańsk	Spotkanie NFM, prezentacja rozwiązania	1024	1890	1	1827463526172836	2024-10-17 18:38:14.149838	completed
7	3	2024-09-26 16:40:02.229+02	2024-09-26 23:40:19.948+02	Gdańsk	Wola Grzymalina Kolonia	\N	1890	2550	1	1827463526172836	2024-10-17 18:40:02.229747	completed
8	4	2024-10-07 17:10:02.229+02	2024-10-07 23:10:02.229+02	Wola Grzymalina Kolonia	Lublin	SPotkanie UMCS, testy z NFM	2550	2850	1	1827463526172836	2024-10-17 18:40:02.229747	completed
9	4	2024-10-09 15:01:02.229+02	2024-10-09 21:10:02.229+02	Lublin	Wola Grzymalina Kolonia	powrót	2850	3100	1	1827463526172836	2024-10-17 18:40:02.229747	completed
10	5	2024-10-17 20:10:02.229+02	2024-10-17 23:55:02.229+02	Wola Grzymalina Kolonia	Poznań	Serwis Poznań	3100	3200	1	1827463526172836	2024-10-17 18:40:02.229747	completed
12	5	2024-10-18 15:01:02.229+02	2024-10-09 21:10:02.229+02	Września 	Wola Grzymalina Kolonia	Serwis Września	3550	3145	1	1827463526172836	2024-10-17 18:40:02.229747	completed
13	6	2024-12-14 07:01:02.229+01	2024-12-14 09:30:02.229+01	Wola Grzymalina Kolonia	Chrzanów	-	3145	3308	1	1827463526172836	2024-10-17 18:40:02.229747	completed
16	6	2024-12-14 23:23:02.229+01	2024-12-15 02:01:02.229+01	Chrzanów	Wola Grzymalina Kolonia	-	4174	4338	1	1827463526172836	2024-10-17 18:40:02.229	completed
17	7	2024-12-17 13:01:02.229+01	2024-12-17 15:32:02.229+01	Wola Grzymalina Kolonia	Radom	-	4338	4503	1	1827463526172836	2024-10-17 18:40:02.229	completed
18	7	2024-12-17 18:01:02.229+01	2024-12-17 20:01:02.229+01	Radom	Wola Grzymalina Kolonia	-	4503	4709	1	1827463526172836	2024-10-17 18:40:02.229	completed
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, first_name, last_name, email, password_hash, organisation_id, created_at) FROM stdin;
1827463526172836	Michał	Mazur	m.mazur.prv@gmail.com	$2a$12$axQXrWFSTff5drlDdDYNvuAs3dEe84hl1ruqhIz/0LcUfuTL.6AHS	1	2024-08-21 20:22:12.135643
\.


--
-- Name: car_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.car_id_seq', 1, true);


--
-- Name: delegation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delegation_id_seq', 9, true);


--
-- Name: organisation_organisation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organisation_organisation_id_seq', 1, false);


--
-- Name: trip_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_trip_id_seq', 22, true);


--
-- Name: car car_license_plate_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_license_plate_unique UNIQUE (license_plate);


--
-- Name: car car_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_pkey PRIMARY KEY (id);


--
-- Name: delegation delegation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delegation
    ADD CONSTRAINT delegation_pkey PRIMARY KEY (id);


--
-- Name: organisation organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisation
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (id);


--
-- Name: trip trip_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: car car_organisation_id_organisation_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_organisation_id_organisation_id_fk FOREIGN KEY (organisation_id) REFERENCES public.organisation(id);


--
-- Name: car car_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: delegation delegation_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delegation
    ADD CONSTRAINT delegation_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: trip trip_car_id_car_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_car_id_car_id_fk FOREIGN KEY (car_id) REFERENCES public.car(id);


--
-- Name: trip trip_delegation_id_delegation_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_delegation_id_delegation_id_fk FOREIGN KEY (delegation_id) REFERENCES public.delegation(id);


--
-- Name: trip trip_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip
    ADD CONSTRAINT trip_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: user user_organisation_id_organisation_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_organisation_id_organisation_id_fk FOREIGN KEY (organisation_id) REFERENCES public.organisation(id);


--
-- PostgreSQL database dump complete
--

