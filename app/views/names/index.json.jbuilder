json.array!(@names) do |name|
  json.name name.name
  json.date name.created_at
  json.bio name.bio
end
