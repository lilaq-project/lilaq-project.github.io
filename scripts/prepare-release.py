import os
import sys

# data = sys.argv[1]

if __name__ == "__main__":
    assert len(sys.argv) == 2, "Please pass the new version as argument"
    
    new_version = sys.argv[1]
    os.system(f"bump-version {new_version}")
    os.system(f"format-release-notes {new_version}")