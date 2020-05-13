load("@npm_bazel_typescript//:index.bzl", "ts_library")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")
load("//tools:tools.bzl", "generate_package_json")

package(default_visibility = ["//visibility:public"])

PACKAGE_NAME = "macro"

pkg_npm(
    name = PACKAGE_NAME,
    deps = [
        ":lib",
        ":package.json",
        "//tools:LICENSE.md",
    ],
)

ts_library(
    name = "lib",
    srcs = glob(["index.ts"]),
    devmode_module = "commonjs",
    module_name = "@formatjs/%s" % PACKAGE_NAME,
    prodmode_module = "commonjs",
)

generate_package_json(
    name = "generate-package-json",
    out = "package.json",
    description = "formatjs-related compiler macros",
    module_name = "@formatjs/%s" % PACKAGE_NAME,
)
