<template>
  <div class="container">
    <div class="row">
      <h1>Vuejs Vue CLI File Upload with Axios and PHP</h1>
      <div
        class="imagePreviewWrapper"
        :style="{ 'background-image': `url(${previewImage})` }"
        @click="selectImage"
      ></div>
      <label>
        File
        <input
          type="file"
          id="file"
          ref="fileInput"
          @change="pickFile"
          accept="image/*"
        />
      </label>
      <button v-on:click="uploadFile">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      previewImage: null,
    };
  },
  methods: {
    uploadFile() {
      if (!this.file) {
        alert("Pilih file terlebih dahulu.");
        return;
      }

      let formData = new FormData();
      formData.append("file", this.file);

      this.axios
        .post("http://localhost/devtest/upload.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (!response.data) {
            alert("File tidak berhasil diunggah.");
          } else {
            alert("File berhasil diunggah.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Upload error");
        });

      // Reset input file
      this.$refs.fileInput.value = "";
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.file = file[0];
      }
    },
  },
};
</script>

<style>
.imagePreviewWrapper {
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
