load("@npm_bazel_typescript//:index.bzl", "ts_library")

package(default_visibility = ["//visibility:public"])

ts_library(
    name = "macro",
    srcs = glob(["src/*.ts"]),
    devmode_module = "commonjs",
    module_root = "src",
    prodmode_module = "commonjs",
)
