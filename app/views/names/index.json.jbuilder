json.array!(@names) do |name|
  json.name name.name
  json.id name.id
  json.bio name.bio
end
