import re
import sys

# data = sys.argv[1]

if __name__ == "__main__":
    assert len(sys.argv) == 2, "Please pass the new version as argument"
    
    version = sys.argv[1]
    
    with open(f"blog/release-{version}.md", "r", encoding="utf-8") as file:
        content = file.read()
    
    content = re.sub("<Crossref target=\"([\\w#\\.\\-]*)\" />", "[`\\1`](https://lilaq.org/docs/reference/\\1)", content)
    content = re.sub("\\[`(\\w*)#(\\w*)`\\]", "[`\\1.\\2`]", content)
    content = content.replace("](/", "](https://lilaq.org/")
    content = content.replace("<!-- truncate -->", "")
    assert "Crossref" not in content, "Something with the link converison failed"

    
    with open(f"external-release-notes-{version}", "w", encoding="utf-8") as file:
        file.write(content)