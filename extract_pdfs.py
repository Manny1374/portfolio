import sys
import subprocess
import os

def install_pypdf():
    try:
        import pypdf
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf"])

install_pypdf()
from pypdf import PdfReader

pdf_files = [
    r"pdf\B4_DDC_EQ06_V2.pdf",
    r"pdf\B4_DDF_EQ06_V1.pdf",
    r"pdf\B4_MOC_LCF_V1.pdf"
]

out_file = "pdf_text.txt"

with open(out_file, "w", encoding="utf-8") as f_out:
    for pdf in pdf_files:
        f_out.write(f"\n{'='*40}\nFILE: {pdf}\n{'='*40}\n")
        try:
            reader = PdfReader(pdf)
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text:
                    f_out.write(text + "\n")
        except Exception as e:
            f_out.write(f"Error reading {pdf}: {e}\n")

print(f"Extraction complete. Text saved to {out_file}")
