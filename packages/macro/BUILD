package(default_visibility=["//visibility:public"])
load("@npm_bazel_typescript//:index.bzl", "ts_library")

ts_library(
    name = "macro",
    srcs = glob(["src/*.ts"]),
    module_root="src",
    prodmode_module = "commonjs",
    devmode_module = "commonjs"
)