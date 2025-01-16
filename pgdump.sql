--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.6

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
-- Name: container; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.container (
    id integer NOT NULL,
    store_id integer NOT NULL,
    label text NOT NULL,
    description text
);


ALTER TABLE public.container OWNER TO postgres;

--
-- Name: container_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.container_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.container_id_seq OWNER TO postgres;

--
-- Name: container_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.container_id_seq OWNED BY public.container.id;


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
-- Name: item_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.item_category (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.item_category OWNER TO postgres;

--
-- Name: item_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.item_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.item_category_id_seq OWNER TO postgres;

--
-- Name: item_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.item_category_id_seq OWNED BY public.item_category.id;


--
-- Name: organization; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.organization OWNER TO postgres;

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

ALTER SEQUENCE public.organisation_organisation_id_seq OWNED BY public.organization.id;


--
-- Name: physical_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.physical_item (
    id integer NOT NULL,
    store_id integer NOT NULL,
    container_id integer,
    category_id integer NOT NULL,
    organization_id integer NOT NULL,
    title text NOT NULL,
    brand text,
    barcode text,
    quantity integer DEFAULT 1,
    warranty_start_date date,
    warranty_end_date date,
    invoice_number text,
    invoice_supplier_code text NOT NULL,
    memo text
);


ALTER TABLE public.physical_item OWNER TO postgres;

--
-- Name: physical_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.physical_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.physical_item_id_seq OWNER TO postgres;

--
-- Name: physical_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.physical_item_id_seq OWNED BY public.physical_item.id;


--
-- Name: store; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store (
    id integer NOT NULL,
    name text NOT NULL,
    location text
);


ALTER TABLE public.store OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.store_id_seq OWNER TO postgres;

--
-- Name: store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.store_id_seq OWNED BY public.store.id;


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
-- Name: container id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.container ALTER COLUMN id SET DEFAULT nextval('public.container_id_seq'::regclass);


--
-- Name: delegation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delegation ALTER COLUMN id SET DEFAULT nextval('public.delegation_id_seq'::regclass);


--
-- Name: item_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_category ALTER COLUMN id SET DEFAULT nextval('public.item_category_id_seq'::regclass);


--
-- Name: organization id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization ALTER COLUMN id SET DEFAULT nextval('public.organisation_organisation_id_seq'::regclass);


--
-- Name: physical_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_item ALTER COLUMN id SET DEFAULT nextval('public.physical_item_id_seq'::regclass);


--
-- Name: store id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store ALTER COLUMN id SET DEFAULT nextval('public.store_id_seq'::regclass);


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
-- Data for Name: container; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.container (id, store_id, label, description) FROM stdin;
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
9	1827463526172836	\N	\N	complete
10	1827463526172836	\N	\N	complete
11	1827463526172836	\N	\N	complete
12	1827463526172836	\N	\N	active
\.


--
-- Data for Name: item_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.item_category (id, name) FROM stdin;
1	Electronics
2	Furniture
3	Books
4	Clothing
5	Toys
6	Groceries
\.


--
-- Data for Name: organization; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization (id, name) FROM stdin;
1	Mirai Technology & Service
\.


--
-- Data for Name: physical_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.physical_item (id, store_id, container_id, category_id, organization_id, title, brand, barcode, quantity, warranty_start_date, warranty_end_date, invoice_number, invoice_supplier_code, memo) FROM stdin;
\.


--
-- Data for Name: store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store (id, name, location) FROM stdin;
1	Attic	Kleszczów
2	Office	Kleszczów
\.


--
-- Data for Name: trip; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip (id, delegation_id, start_time, end_time, start_location, end_location, trip_description, start_meter, end_meter, car_id, user_id, last_updated, status) FROM stdin;
4	2	2024-08-08 20:10:00+02	2024-08-08 22:45:00+02	Lublin	Rzeszów	\N	440	645	1	1827463526172836	2024-08-22 10:55:26.071094	completed
19	8	2024-12-18 11:30:00+01	2024-12-18 13:35:00+01	Wola Grzymalina Kolonia	Radom	\N	4709	4861	1	1827463526172836	2024-12-19 19:18:23.414894	completed
11	5	2024-10-18 15:01:00+02	2024-10-18 21:10:00+02	Poznań	Września	Serwis Września	2950	3000	1	1827463526172836	2024-10-17 18:40:02.229747	completed
10	5	2024-10-17 20:10:00+02	2024-10-17 23:55:00+02	Wola Grzymalina Kolonia	Poznań	Serwis Poznań	2650	2950	1	1827463526172836	2024-10-17 18:40:02.229747	completed
9	4	2024-10-09 15:01:00+02	2024-10-09 21:10:00+02	Lublin	Wola Grzymalina Kolonia	powrót	2300	2650	1	1827463526172836	2024-10-17 18:40:02.229747	completed
24	9	2024-12-28 18:29:00+01	2024-12-28 19:03:00+01	Radomsko	Wola Grzymalina Kolonia	\N	5169	5205	1	1827463526172836	2024-12-28 18:30:41.428003	completed
23	9	2024-12-28 14:19:00+01	2024-12-28 14:58:00+01	Wola Grzymalina Kolonia	Radomsko	\N	5138	5169	1	1827463526172836	2024-12-28 18:29:16.846423	completed
20	8	2024-12-18 17:20:00+01	2024-12-18 18:20:00+01	Radom	Huta Żabiowska	\N	4861	4938	1	1827463526172836	2024-12-19 19:21:16.059995	completed
22	8	2024-12-19 12:39:00+01	2024-12-19 14:30:00+01	Pruszków	Wola Grzymalina Kolonia	\N	4972	5138	1	1827463526172836	2024-12-19 19:23:41.14364	completed
21	8	2024-12-19 10:15:00+01	2024-12-19 10:45:00+01	Huta Żabiowska	Pruszków	\N	4938	4972	1	1827463526172836	2024-12-19 19:22:59.328488	completed
1	1	2024-07-19 17:44:00+02	2024-07-19 19:45:00+02	Łódź	Wola Grzymalina Kolonia	\N	0	100	1	1827463526172836	2024-08-22 10:47:57.711147	completed
2	2	2024-08-07 15:15:00+02	2024-08-07 17:15:00+02	Wola Grzymalina Kolonia	Warszawa	\N	100	270	1	1827463526172836	2024-08-22 10:52:22.56868	completed
5	2	2024-08-10 14:20:00+02	2024-08-10 19:35:00+02	Rzeszów	Wola Grzymalina Kolonia	\N	645	1024	1	1827463526172836	2024-08-22 10:57:19.034029	completed
6	3	2024-09-25 17:39:00+02	2024-09-25 23:55:00+02	Wola Grzymalina Kolonia	Lębork	Spotkanie NFM, prezentacja rozwiązania	1024	1500	1	1827463526172836	2024-10-17 18:38:14.149838	completed
18	7	2024-12-17 18:01:00+01	2024-12-17 20:01:00+01	Radom	Wola Grzymalina Kolonia	-	4503	4709	1	1827463526172836	2024-10-17 18:40:02.229	completed
17	7	2024-12-17 13:01:00+01	2024-12-17 15:32:00+01	Wola Grzymalina Kolonia	Radom	-	4338	4503	1	1827463526172836	2024-10-17 18:40:02.229	completed
16	6	2024-12-14 23:23:00+01	2024-12-15 02:01:00+01	Chrzanów	Wola Grzymalina Kolonia	-	4174	4338	1	1827463526172836	2024-10-17 18:40:02.229	completed
15	6	2024-12-14 19:01:00+01	2024-12-14 23:01:00+01	Września	Chrzanów	-	3713	4174	1	1827463526172836	2024-10-17 18:40:02.229	completed
14	6	2024-12-14 10:01:00+01	2024-12-14 15:01:00+01	Chrzanów	Września	-	3308	3713	1	1827463526172836	2024-10-17 18:40:02.229747	completed
25	10	2024-12-31 14:45:00+01	2024-12-31 15:35:00+01	Wola Grzymalina Kolonia	Radomsko	\N	5205	5229	1	1827463526172836	2024-12-31 16:46:36.709837	completed
7	3	2024-09-26 16:40:00+02	2024-09-26 23:40:00+02	Lębork	Wola Grzymalina Kolonia	\N	1500	1970	1	1827463526172836	2024-10-17 18:40:02.229747	completed
26	10	2024-12-31 16:46:00+01	2024-12-31 17:13:00+01	Radomsko	Wola Grzymalina Kolonia	\N	5229	5255	1	1827463526172836	2024-12-31 16:47:23.737427	completed
3	2	2024-08-08 14:17:00+02	2024-08-08 16:03:00+02	Warszawa	Lublin	\N	270	440	1	1827463526172836	2024-08-22 10:53:49.805319	completed
27	11	2025-01-03 11:11:00+01	2025-01-03 14:20:00+01	Wola Grzymalina Kolonia	Radom	\N	5255	5398	1	1827463526172836	2025-01-03 22:21:15.681221	completed
8	4	2024-10-07 16:10:00+02	2024-10-07 23:10:00+02	Wola Grzymalina Kolonia	Lublin	SPotkanie UMCS, testy z NFM	1970	2300	1	1827463526172836	2024-10-17 18:40:02.229747	completed
28	11	2025-01-03 18:21:00+01	2025-01-03 22:21:00+01	Radom	Wola Grzymalina Kolonia	\N	5398	5550	1	1827463526172836	2025-01-03 22:21:57.282526	completed
13	6	2024-12-14 07:01:00+01	2024-12-14 09:30:00+01	Wola Grzymalina Kolonia	Chrzanów	-	3200	3308	1	1827463526172836	2024-10-17 18:40:02.229747	completed
12	5	2024-10-18 15:01:00+02	2024-10-18 21:10:00+02	Września 	Wola Grzymalina Kolonia	Serwis Września	3000	3200	1	1827463526172836	2024-10-17 18:40:02.229747	completed
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
-- Name: container_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.container_id_seq', 1, false);


--
-- Name: delegation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.delegation_id_seq', 12, true);


--
-- Name: item_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_category_id_seq', 6, true);


--
-- Name: organisation_organisation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organisation_organisation_id_seq', 1, false);


--
-- Name: physical_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.physical_item_id_seq', 1, false);


--
-- Name: store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.store_id_seq', 2, true);


--
-- Name: trip_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_trip_id_seq', 28, true);


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
-- Name: container container_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_pkey PRIMARY KEY (id);


--
-- Name: delegation delegation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delegation
    ADD CONSTRAINT delegation_pkey PRIMARY KEY (id);


--
-- Name: item_category item_category_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_category
    ADD CONSTRAINT item_category_name_key UNIQUE (name);


--
-- Name: item_category item_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.item_category
    ADD CONSTRAINT item_category_pkey PRIMARY KEY (id);


--
-- Name: organization organisation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization
    ADD CONSTRAINT organisation_pkey PRIMARY KEY (id);


--
-- Name: physical_item physical_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_item
    ADD CONSTRAINT physical_item_pkey PRIMARY KEY (id);


--
-- Name: store store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store
    ADD CONSTRAINT store_pkey PRIMARY KEY (id);


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
    ADD CONSTRAINT car_organisation_id_organisation_id_fk FOREIGN KEY (organisation_id) REFERENCES public.organization(id);


--
-- Name: car car_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT car_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: container container_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.store(id);


--
-- Name: delegation delegation_user_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.delegation
    ADD CONSTRAINT delegation_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id);


--
-- Name: physical_item physical_item_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_item
    ADD CONSTRAINT physical_item_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.item_category(id);


--
-- Name: physical_item physical_item_container_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_item
    ADD CONSTRAINT physical_item_container_id_fkey FOREIGN KEY (container_id) REFERENCES public.container(id);


--
-- Name: physical_item physical_item_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_item
    ADD CONSTRAINT physical_item_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organization(id);


--
-- Name: physical_item physical_item_store_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.physical_item
    ADD CONSTRAINT physical_item_store_id_fkey FOREIGN KEY (store_id) REFERENCES public.store(id);


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
    ADD CONSTRAINT user_organisation_id_organisation_id_fk FOREIGN KEY (organisation_id) REFERENCES public.organization(id);


--
-- PostgreSQL database dump complete
--

