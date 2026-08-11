"""Print a lightweight structural summary of the source robot GLB."""

from __future__ import annotations

import collections
import json
import struct
from pathlib import Path


GLB_PATH = Path(__file__).resolve().parents[1] / "robot-assets" / "source" / "robot.glb"


def main() -> None:
    with GLB_PATH.open("rb") as source:
        magic, version, total_length = struct.unpack("<4sII", source.read(12))
        json_length, json_type = struct.unpack("<II", source.read(8))
        document = json.loads(source.read(json_length).decode("utf-8"))

    print("header", magic, version, total_length, "json_type", hex(json_type))
    print(
        {
            key: len(document.get(key, []))
            for key in (
                "scenes",
                "nodes",
                "meshes",
                "materials",
                "textures",
                "images",
                "accessors",
                "bufferViews",
                "buffers",
                "animations",
            )
        }
    )
    scene_index = document.get("scene", 0)
    print("roots", document.get("scenes", [{}])[scene_index].get("nodes", []))
    print("extensionsUsed", document.get("extensionsUsed"))
    print("asset", document.get("asset"))
    print("node names sample")
    for index, node in list(enumerate(document.get("nodes", [])))[:100]:
        print(
            f"{index}: {node.get('name')} mesh={node.get('mesh')} "
            f"children={len(node.get('children', []))}"
        )
    print(
        "mesh primitive counts",
        collections.Counter(
            len(mesh.get("primitives", [])) for mesh in document.get("meshes", [])
        ).most_common(10),
    )
    print(
        "material names",
        [material.get("name") for material in document.get("materials", [])[:50]],
    )


if __name__ == "__main__":
    main()
