load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")

package(default_visibility = ["//visibility:public"])

pkg_npm(
    name = "macro",
    srcs = [
        "LICENSE.md",
        "package.json",
    ],
    deps = [":macro-lib"],
)

ts_library(
    name = "macro-lib",
    srcs = glob(["src/*.ts"]),
    devmode_module = "commonjs",
    module_name = "@formatjs/macro",
    prodmode_module = "commonjs",
)
