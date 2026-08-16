CREATE POLICY "Allow public uploads to teamdev"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'teamdev'
);