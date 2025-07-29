import os
import sys

# data = sys.argv[1]

if __name__ == "__main__":
    assert len(sys.argv) == 2, "Please pass the new version as argument"
    
    new_version = sys.argv[1]
    os.system(f"python scripts/bump-version.py {new_version}")
    os.system(f"python scripts/format-release-notes.py {new_version}")