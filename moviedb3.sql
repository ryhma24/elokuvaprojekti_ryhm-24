--
-- PostgreSQL database dump
--

\restrict xn9sU0ZEGd69RoEGsd3gNgacl4BUX1wraKZvnpbMHuuyO5cQaE39lv9PvMEdOWV

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-12-16 11:40:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 16836)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    idaccount integer NOT NULL,
    username character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    password character varying(60) NOT NULL,
    refresh_token character varying(200),
    deletion_flag boolean,
    deletion_date character varying(20),
    idavatar integer
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16843)
-- Name: account_idaccount_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.account_idaccount_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.account_idaccount_seq OWNER TO postgres;

--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 220
-- Name: account_idaccount_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.account_idaccount_seq OWNED BY public.account.idaccount;


--
-- TOC entry 221 (class 1259 OID 16844)
-- Name: favourites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favourites (
    idfavourites integer NOT NULL,
    idaccount integer NOT NULL,
    movieid integer NOT NULL,
    ismovie boolean NOT NULL
);


ALTER TABLE public.favourites OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16851)
-- Name: favourites_idfavourites_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favourites_idfavourites_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favourites_idfavourites_seq OWNER TO postgres;

--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 222
-- Name: favourites_idfavourites_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favourites_idfavourites_seq OWNED BY public.favourites.idfavourites;


--
-- TOC entry 223 (class 1259 OID 16852)
-- Name: group_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_members (
    id integer NOT NULL,
    idgroup integer NOT NULL,
    idaccount integer NOT NULL,
    status character varying(20) NOT NULL,
    requested_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    responded_at timestamp without time zone,
    CONSTRAINT group_members_status_check CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('accepted'::character varying)::text, ('rejected'::character varying)::text])))
);


ALTER TABLE public.group_members OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16861)
-- Name: group_members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.group_members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.group_members_id_seq OWNER TO postgres;

--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 224
-- Name: group_members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.group_members_id_seq OWNED BY public.group_members.id;


--
-- TOC entry 225 (class 1259 OID 16862)
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    idgroup integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    owner integer NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16871)
-- Name: groups_idgroup_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groups_idgroup_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.groups_idgroup_seq OWNER TO postgres;

--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 226
-- Name: groups_idgroup_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groups_idgroup_seq OWNED BY public.groups.idgroup;


--
-- TOC entry 227 (class 1259 OID 16872)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    idreviews integer NOT NULL,
    review character varying(200),
    rating double precision,
    idaccount integer NOT NULL,
    idmovie integer NOT NULL,
    date character varying(30),
    ismovie boolean NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16879)
-- Name: reviews_idreviews_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_idreviews_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_idreviews_seq OWNER TO postgres;

--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 228
-- Name: reviews_idreviews_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_idreviews_seq OWNED BY public.reviews.idreviews;


--
-- TOC entry 4876 (class 2604 OID 16880)
-- Name: account idaccount; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account ALTER COLUMN idaccount SET DEFAULT nextval('public.account_idaccount_seq'::regclass);


--
-- TOC entry 4877 (class 2604 OID 16881)
-- Name: favourites idfavourites; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites ALTER COLUMN idfavourites SET DEFAULT nextval('public.favourites_idfavourites_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 16882)
-- Name: group_members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members ALTER COLUMN id SET DEFAULT nextval('public.group_members_id_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 16883)
-- Name: groups idgroup; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups ALTER COLUMN idgroup SET DEFAULT nextval('public.groups_idgroup_seq'::regclass);


--
-- TOC entry 4882 (class 2604 OID 16884)
-- Name: reviews idreviews; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN idreviews SET DEFAULT nextval('public.reviews_idreviews_seq'::regclass);


--
-- TOC entry 5052 (class 0 OID 16836)
-- Dependencies: 219
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (idaccount, username, email, password, refresh_token, deletion_flag, deletion_date) FROM stdin;
\.


--
-- TOC entry 5054 (class 0 OID 16844)
-- Dependencies: 221
-- Data for Name: favourites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favourites (idfavourites, idaccount, movieid, ismovie) FROM stdin;
\.


--
-- TOC entry 5056 (class 0 OID 16852)
-- Dependencies: 223
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.group_members (id, idgroup, idaccount, status, requested_at, responded_at) FROM stdin;
\.


--
-- TOC entry 5058 (class 0 OID 16862)
-- Dependencies: 225
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (idgroup, name, description, created_at, owner) FROM stdin;
\.


--
-- TOC entry 5060 (class 0 OID 16872)
-- Dependencies: 227
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (idreviews, review, rating, idaccount, idmovie, date, ismovie) FROM stdin;
\.


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 220
-- Name: account_idaccount_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.account_idaccount_seq', 2, true);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 222
-- Name: favourites_idfavourites_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favourites_idfavourites_seq', 49, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 224
-- Name: group_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.group_members_id_seq', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 226
-- Name: groups_idgroup_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groups_idgroup_seq', 1, false);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 228
-- Name: reviews_idreviews_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_idreviews_seq', 81, true);


--
-- TOC entry 4885 (class 2606 OID 16886)
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (idaccount);


--
-- TOC entry 4889 (class 2606 OID 16888)
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY (idaccount, movieid, ismovie);


--
-- TOC entry 4891 (class 2606 OID 16890)
-- Name: group_members group_members_idgroup_idaccount_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_idgroup_idaccount_key UNIQUE (idgroup, idaccount);


--
-- TOC entry 4893 (class 2606 OID 16892)
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (id);


--
-- TOC entry 4895 (class 2606 OID 16894)
-- Name: groups groups_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);


--
-- TOC entry 4897 (class 2606 OID 16896)
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (idgroup);


--
-- TOC entry 4899 (class 2606 OID 16898)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (idaccount, idmovie, ismovie);


--
-- TOC entry 4887 (class 2606 OID 16900)
-- Name: account username_unq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT username_unq UNIQUE (username);


--
-- TOC entry 4900 (class 2606 OID 16901)
-- Name: favourites foreign_idaccount; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT foreign_idaccount FOREIGN KEY (idaccount) REFERENCES public.account(idaccount) ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 16906)
-- Name: reviews foreign_idaccount; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT foreign_idaccount FOREIGN KEY (idaccount) REFERENCES public.account(idaccount) ON DELETE CASCADE;


--
-- TOC entry 4901 (class 2606 OID 16911)
-- Name: group_members group_members_idaccount_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_idaccount_fkey FOREIGN KEY (idaccount) REFERENCES public.account(idaccount) ON DELETE CASCADE;


--
-- TOC entry 4902 (class 2606 OID 16916)
-- Name: group_members group_members_idgroup_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_idgroup_fkey FOREIGN KEY (idgroup) REFERENCES public.groups(idgroup) ON DELETE CASCADE;


--
-- TOC entry 4903 (class 2606 OID 16921)
-- Name: groups groups_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_owner_fkey FOREIGN KEY (owner) REFERENCES public.account(idaccount) ON DELETE CASCADE;


-- Completed on 2025-12-16 11:40:00

--
-- PostgreSQL database dump complete
--

\unrestrict xn9sU0ZEGd69RoEGsd3gNgacl4BUX1wraKZvnpbMHuuyO5cQaE39lv9PvMEdOWV

