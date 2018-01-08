# The Name Hall of Fame
The Name Hall of Fame is a pet project I've been working on with my brother.  The idea is born of inside joke between us and our friend Collin and
the purpose is to document the greatest names ever bequeathed.

Names are submitted by the public but only are added to the list if they have a corresponding wikipedia page.

## Parsing wikipedia
The majority of the heavy lifting in this code is done in the add_name component and the name_utils.js file.
The response text from wikipedia comes with a variety of issues, including but not limited to inline links, citations, and
inline <ref> tags.  You can see the code for parsing the response text in the /frontend/utils/name_utils file.

### [Live!](namehalloffame.org)
