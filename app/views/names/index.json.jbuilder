json.array!(@names) do |name|
  json.id name.id
  json.name name.name
  json.date name.created_at
  json.bio name.bio
  json.score name.score
end
