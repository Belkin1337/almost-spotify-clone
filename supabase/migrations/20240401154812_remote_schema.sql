set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.extension(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$function$
;

CREATE OR REPLACE FUNCTION storage.filename(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$function$
;

CREATE OR REPLACE FUNCTION storage.foldername(name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$function$
;

create policy "allow all  1ufimg_0"
on "storage"."objects"
as permissive
for select
to authenticated
using ((bucket_id = 'users'::text));


create policy "allow all  1ufimg_2"
on "storage"."objects"
as permissive
for delete
to authenticated
using ((bucket_id = 'users'::text));


create policy "allow all 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'images'::text));


create policy "allow all 1ffg0oo_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'images'::text));


create policy "allow all 1ffg0oo_2"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'images'::text));


create policy "allow all 1ffg0oo_3"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'images'::text));


create policy "allow all 1t9jwe_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'songs'::text));


create policy "allow all 1t9jwe_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'songs'::text));


create policy "allow all 1t9jwe_2"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'songs'::text));


create policy "allow all 1t9jwe_3"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'songs'::text));


create policy "allow update 1ufimg_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'users'::text));


create policy "as 1ufimg_0"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'users'::text));


create policy "as 1ufimg_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'users'::text));



