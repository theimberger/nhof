@names.each do |name|
  json.set! space.id do
    json.partial! "api/spaces/space", name: name
  end
end
